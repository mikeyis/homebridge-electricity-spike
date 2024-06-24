
const axios = require('axios');
const { Accessory, Service, Characteristic, UUIDGen } = require('homebridge');

const pluginName = 'homebridge-electricity-spike';
const platformName = 'ElectricitySpikePlatform';

module.exports = (homebridge) => {
  homebridge.registerAccessory(pluginName, platformName, ElectricitySpikeAccessory);
};

class ElectricitySpikeAccessory {
  constructor(log, config) {
    this.log = log;
    this.name = config.name;
    this.apiToken = config.apiToken;
    this.siteID = config.siteID;
    this.pollingInterval = parseInt(config.pollingInterval, 10) || 60000; // default to 1 minute

    if (!this.apiToken || !this.siteID) {
      this.log.error('API token and site ID must be specified in the configuration.');
      return;
    }

    this.apiUrl = `https://api.amber.com.au/v1/sites/${this.siteID}/prices/current?resolution=30`;

    this.spikeDetected = false;

    this.informationService = new Service.AccessoryInformation()
      .setCharacteristic(Characteristic.Manufacturer, 'Your Company')
      .setCharacteristic(Characteristic.Model, 'Electricity Spike Detector')
      .setCharacteristic(Characteristic.SerialNumber, '123-456-789');

    this.switchService = new Service.Switch(this.name);

    this.switchService
      .getCharacteristic(Characteristic.On)
      .on('get', this.handleOnGet.bind(this));

    this.pollForSpike();
    setInterval(this.pollForSpike.bind(this), this.pollingInterval);
  }

  handleOnGet(callback) {
    callback(null, this.spikeDetected);
  }

  async pollForSpike() {
    try {
      const response = await axios.get(this.apiUrl, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`
        }
      });
      const spikeStatus = response.data[0].spikeStatus; // Assuming the first item in the array
      const spike = spikeStatus !== 'none';
      if (spike && !this.spikeDetected) {
        this.spikeDetected = true;
        this.switchService.updateCharacteristic(Characteristic.On, true);
        // Trigger HomeKit Automation
      } else if (!spike && this.spikeDetected) {
        this.spikeDetected = false;
        this.switchService.updateCharacteristic(Characteristic.On, false);
      }
    } catch (error) {
      this.log.error('Error fetching spike data:', error);
    }
  }

  getServices() {
    return [this.informationService, this.switchService];
  }
}
