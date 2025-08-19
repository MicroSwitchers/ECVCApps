# App Menu - Progressive Web App

A collection of prototype apps and field resources by Niall Brown, now available as a Progressive Web App (PWA).

## PWA Features

- **Installable**: Can be installed on any device (phones, tablets, desktops)
- **Offline Support**: Core functionality works without internet connection
- **Cross-Platform**: Works on iOS, Android, Windows, macOS, and Linux
- **App-like Experience**: Runs in standalone mode without browser UI
- **Responsive**: Adapts to any screen size
- **Accessible**: Built with accessibility best practices

## Installation

### On Mobile (iOS/Android)
1. Open the website in your browser
2. Look for "Add to Home Screen" or "Install App" prompt
3. Follow the installation prompts
4. The app will appear on your home screen

### On Desktop (Windows/macOS/Linux)
1. Open the website in Chrome, Edge, or other PWA-compatible browser
2. Look for the install icon in the address bar
3. Click "Install" or "Add to Desktop"
4. The app will appear in your applications folder and taskbar

### On Windows
- The app will appear in the Start Menu
- Can be pinned to the taskbar
- Shows up in the Windows launcher

## Files Structure

- `manifest.json` - PWA configuration and metadata
- `sw.js` - Service Worker for offline functionality
- `icon.svg` - Single scalable icon for all platforms
- `browserconfig.xml` - Windows-specific configuration
- `offline.html` - Fallback page when offline
- `index.html` - Main application with PWA meta tags

## Technical Details

- Uses a single SVG icon that scales to all required sizes
- Service Worker provides offline caching
- Responsive design works on all screen sizes
- Accessible with proper ARIA labels and keyboard navigation
- Fast loading with resource preloading

## Browser Support

- Chrome/Chromium (full support)
- Edge (full support)
- Firefox (partial support)
- Safari (partial support on iOS 11.3+)

## Categories

- Calculator Apps
- Braille Apps  
- Single Switch Apps
- Assistive Devices
- Microcontroller Devices
- Experimental Projects

Each category contains specialized tools for accessibility and assistive technology.
