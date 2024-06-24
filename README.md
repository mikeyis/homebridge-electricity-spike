
# homebridge-electricity-spike

**Homebridge Electricity Spike Detector**

This Homebridge plugin detects electricity price spikes and triggers HomeKit automations. It fetches data from the Amber API to monitor electricity prices and updates a HomeKit switch based on the spike status.

## Features

- **API Integration**: Fetches real-time electricity price data from the Amber API.
- **HomeKit Compatibility**: Creates a HomeKit switch accessory to represent the spike status.
- **Configurable Polling Interval**: Allows users to set polling intervals of 5, 10, or 30 minutes.
- **Homebridge UI Configuration**: Easy configuration through the Homebridge UI.

## Installation

1. **Install Homebridge**:
   Follow the [Homebridge Installation Instructions](https://github.com/homebridge/homebridge/wiki).

2. **Install the Plugin**:
   Install via the Homebridge UI or run the following command:
   ```bash
   npm install -g homebridge-electricity-spike
   ```

## Configuration

Add the following configuration to your `config.json` file:

```json
{
  "accessories": [
    {
      "accessory": "ElectricitySpikePlatform",
      "name": "Electricity Spike Detector",
      "apiToken": "your_api_token",
      "siteID": "your_site_id",
      "pollingInterval": "600000" // Example: 600000 for 10 minutes
    }
  ]
}
```

## Example Usage

1. **HomeKit Automations**:
   - Turn off non-critical devices like heaters and AC units when a spike is detected.
   - Use HomeKit notifications or Intercom to alert when a spike occurs.

## Support

If you encounter any issues or have questions, please open an issue on the [GitHub Issues](https://github.com/yourusername/homebridge-electricity-spike/issues) page.

## License

This project is licensed under the ISC License.

## Repository Structure

- **index.js**: Main plugin code.
- **package.json**: Package metadata.
- **README.md**: Project documentation.
- **config.schema.json**: Configuration schema for Homebridge UI.
