# **ScAI Frontend: TianXun Constellation Simulation and Integrated Management Platform Client**
<div align="center">

[![License](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/tianxunweixiao/ScAI-Frontend)

[![Webpack](https://img.shields.io/badge/Build-Webpack-8DD6F9?logo=webpack&logoColor=black)](https://webpack.js.org/)
[![WebGL](https://img.shields.io/badge/Graphics-WebGL-990000?logo=webgl&logoColor=white)](https://www.khronos.org/webgl/)
[![Jest](https://img.shields.io/badge/Test-Jest-C21325?logo=jest&logoColor=white)](https://jestjs.io/)
[![Cypress](https://img.shields.io/badge/E2E-Cypress-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/)

[**简体中文**](./README.md) | [**English**](./README_EN.md)
</div>

<img width="2564" height="1536" alt="Gemini_Generated_Image_7urlyp7urlyp7url" src="https://github.com/user-attachments/assets/b018204f-a95b-4f39-a104-1fda4432462f" />

`ScAI` is a constellation simulation and integrated management platform developed by Chengdu TianXun Microsatellite Technology Co., Ltd., aimed at solving the operational control complexity challenges brought by the rapid expansion of constellation scale in the commercial space sector.

The platform adopts an Agent-oriented architecture design. The current open-source version focuses on building a high-precision orbit simulation calculation engine and data interaction foundation. It currently supports all-weather, all-region target area coverage simulation and resource scheduling for optical remote sensing satellites, laying a solid computing and data foundation for the future introduction of intelligent agents for automated task orchestration. `ScAI Frontend` is the frontend application of the `ScAI` platform, designed to provide users with an intuitive, high-performance satellite orbit visualization and interactive experience.

This project is a secondary development based on the open-source project [KeepTrack.Space](https://github.com/thkruz/keeptrack.space). While retaining its powerful WebGL 3D rendering capabilities and high-performance computing engine, it deeply integrates ScAI Backend services and ClickHouse database, implementing a complete constellation simulation and integrated management solution.

The platform is built using modern web technology stack and implements high-performance 3D rendering based on WebGL. The core application is only 7MB and can load within 2 seconds, providing users with a smooth interactive experience.

As the core user interface component of the platform, `ScAI Frontend` carries key functions such as data visualization, user interaction, simulation result display, and API interface calls, working closely with ScAI Backend to jointly build a complete constellation simulation and management ecosystem.

## **📖 Table of Contents**

* [Core Modules](#-core-modules)
* [Technical Architecture](#-technical-architecture)
* [Features](#-features)
* [Quick Start](#-quick-start)
* [Usage Guide](#-usage-guide)
* [Troubleshooting](#-troubleshooting)
* [Contributing Guide](#-contributing-guide)
* [License](#-license)
* [Contact](#-contact)
* [To-Do List](#-to-do-list)

## **🧩 Core Modules**

ScAI Frontend adopts a plugin-based architecture composed of the following core modules:

| Module | Directory | Description |
| :---- | :---- | :---- |
| **Singleton Managers** | src/singletons/ | Core management classes, including camera control, catalog management, time management, UI management, WebGL renderer, etc. |
| **Plugin System** | src/plugins/ | Functional plugins, including satellite management, sensor management, analysis tools, etc. |
| **Draw Manager** | src/singletons/draw-manager/ | 3D object rendering, including Earth, satellites, etc. |
| **Web Workers** | src/webworker/ | Background computing threads responsible for satellite position calculation, orbit updates, and other intensive computing tasks |
| **Static Utilities** | src/static/ | Common utility functions, including catalog loading, search, orbit calculation, coordinate conversion, etc. |
| **Authentication Service** | src/auth/ | User authentication service responsible for login, logout, and session management |
| **Catalog Data** | src/catalogs/ | Static catalog data, including constellations, countries, etc. |
| **Settings Management** | src/settings/ | Application settings management, including color schemes, plugin configuration, presets, etc. |
| **Internationalization** | src/locales/ | Multi-language support, including Chinese, English, German, French, Japanese, Korean, Russian, Ukrainian, etc. |
| **Utility Library** | src/lib/ | Common utility functions, including animation effects, color processing, data conversion, etc. |

## **🏗 Technical Architecture**

### **Directory Structure**

ScAI Frontend/  
├── src/                      # 🎨 Source code directory  
│   ├── main.ts              # Application entry file  
│   ├── keeptrack.ts         # Core application logic  
│   ├── container.ts         # Container management  
│   ├── auth/                # Authentication service  
│   ├── catalogs/            # Static catalog data (constellations, countries, etc.)  
│   ├── lib/                 # Utility library  
│   ├── locales/             # Multi-language support  
│   ├── plugins/             # Functional plugin system  
│   ├── settings/            # Settings management  
│   ├── singletons/          # Singleton managers  
│   │   ├── draw-manager/    # Draw manager  
│   │   ├── color-schemes/   # Color schemes  
│   │   └── catalog-manager/ # Catalog manager  
│   ├── static/              # Static utility functions  
│   ├── types/               # TypeScript type definitions  
│   └── webworker/           # Web Workers (background computing threads)  
│  
├── build/                    # 🔨 Build scripts  
│   ├── build-manager.ts     # Build manager  
│   ├── webpack-manager.ts   # Webpack configuration  
│   ├── set-env.ts           # Environment configuration  
│   └── lib/                 # Build utility library  
│  
├── docs/                     # 📚 User manual  
│   ├── images/              # Feature screenshots  
│   ├── source/              # Documentation source files  
│   ├── app_*.md             # Feature module documentation  
│   ├── base_*.md            # Basic feature documentation  
│   └── appendix_*.md        # Appendix documentation  
│  
├── public/                   # 📁 Static resources  
│   ├── css/                 # Style files  
│   ├── img/                 # Image resources  
│   ├── audio/               # Audio files  
│   ├── data/                # Data files  
│   └── flags/               # Country flag icons  
│  
├── auth/                     # 🔐 Authentication related  
│   └── callback.html        # Authentication callback page  
│  
├── package.json             # Project configuration and dependencies  
├── tsconfig.json            # TypeScript configuration  
├── babel.config.cjs         # Babel configuration  
├── jest.config.js           # Jest test configuration  
├── .env.example             # Environment configuration example file  
└── .prettierrc              # Prettier code formatting configuration

### **Technology Stack**

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Development Language** | **TypeScript** | Type-safe JavaScript superset |
| **Build Tools** | **Rspack** | High-performance module bundling tool |
| | **Webpack** | Module bundling and building (configured via webpack-manager.ts) |
| | **Babel** | JavaScript/TypeScript code transformation |
| **Graphics Rendering** | **WebGL** | High-performance 3D graphics rendering |
| | **WebGL OBJ Loader** | 3D model loader |
| **UI Framework** | **Materialize CSS** | Responsive UI component library |
| | **Material Icons** | Icon library |
| | **Flag Icons** | Country flag icons |
| **Data Visualization** | **ECharts** | Interactive chart drawing |
| | **ECharts GL** | 3D data visualization |
| **Internationalization** | **i18next** | Internationalization framework |
| | **i18next Browser Language Detector** | Browser language detection |
| **Testing Framework** | **Jest** | Unit testing framework |
| | **Cypress** | End-to-end testing framework |
| | **Testing Library** | DOM testing tools |
| **Code Quality** | **ESLint** | Code linting tool |
| | **Prettier** | Code formatting tool |
| | **Husky** | Git hooks management |
| **Utility Components** | **ootk** | Orbit calculation toolkit |
| | **gl-matrix** | Matrix operation library |
| | **numeric** | Numerical calculation library |
| | **file-saver** | File saving tool |
| | **uuid** | UUID generator |
| | **draggabilly** | Drag and drop functionality library |
| **Backend Integration** | **FastAPI** | RESTful API communication with ScAI Backend |
| | **Environment Variable Configuration** | Configure backend service addresses via .env file |
| **Data Storage** | **ClickHouse** | High-performance time-series database accessed via backend API |

### **System Integration Architecture**

ScAI Frontend and ScAI Backend form a complete constellation simulation and management platform:

* **Frontend (ScAI Frontend)**: Responsible for user interface, data visualization, interactive control, and 3D rendering
* **Backend (ScAI Backend)**: Provides API services, simulation calculation, data processing, and business logic
* **Database (ClickHouse)**: Stores satellite data, simulation results, and user information

The frontend communicates with the backend via RESTful API, and the backend is responsible for interacting with the ClickHouse database to achieve data persistence and efficient querying.

### **Data Flow**

graph TD  
    A[User Operation] -->|Interaction Event| B[Plugin System]  
    B -->|Call Manager| C[Singleton Managers]  
    C -->|Fetch API| D[ScAI Backend API]  
    D -->|Return Data| C  
    C -->|Update State| E[Web Workers]  
    E -->|Calculation Result| F[Draw Manager]  
    F -->|Render Scene| G[WebGL Canvas]  
    C -->|Update UI| B

## **✨ Features**

### **1. Plugin-Based Architecture**

* 🔌 **Plugin System**: Adopts modular plugin architecture supporting flexible feature extension
* 📦 **Rich Plugins**: Contains multiple functional plugins covering satellite management, sensor management, analysis tools, etc.

### **2. Core Rendering Engine**

* 🌍 **3D Earth Rendering**: High-precision Earth model supporting texture mapping, cloud layers, and lighting effects
* 🛰️ **Satellite Visualization**: Real-time rendering of satellite positions, orbit trajectories, and motion states
* 🌌 **Starry Background**: Dynamic starry background enhancing visual immersion
* ⚡ **High-Performance Rendering**: Supports simultaneous rendering of large numbers of space objects while maintaining smooth frame rates

### **3. Web Workers Background Computing**

* 📊 **Position Calculation**: Real-time calculation of precise satellite positions in orbit
* 🔄 **Orbit Updates**: Dynamic updates of orbit trajectories supporting satellite maneuver simulation
* 💾 **Data Management**: Efficient satellite data indexing and query mechanisms
* 🧮 **Orbit Calculation**: Precise orbital mechanics calculations using the ootk library

### **4. User Interaction Features**

* 🎯 **Object Selection**: Click to select satellites or other space targets
* 📈 **Information Display**: Display detailed parameters and status information of selected objects
* 🎮 **Interactive Control**: Supports mouse and keyboard
* 🌐 **View Control**: Zoom, rotate, pan, and other 3D view operations
* 🎨 **Color Schemes**: Supports multiple color schemes

### **5. Data Visualization**

* 📊 **Chart Display**: Use ECharts to display orbit parameters and other data
* 🗺️ **Map Integration**: Supports tile maps and custom map services
* 📦 **Data Export**: Supports exporting simulation results
* 📉 **Analysis Charts**: Including ECF/ECI coordinate plots, etc.

### **6. Backend Integration**

* 🔌 **API Communication**: Data interaction with ScAI Backend via Fetch API
* 🛰️ **Satellite Data**: Obtain satellite TLE data and detailed information from the backend
* 🌟 **Constellation Management**: Supports obtaining and managing constellation configurations from the backend
* 👤 **User Authentication**: Integrated authentication service supporting user login and session management

### **7. Multi-Language Support**

* 🌍 **Internationalization**: Supports 8 languages (Chinese, English, German, French, Japanese, Korean, Russian, Ukrainian)
* 🔤 **Auto Detection**: Automatically detects browser language and switches
* 📝 **Easy Extension**: Based on i18next framework, easy to add new languages

### **8. Advanced Features**

* 📊 **Analysis Tools**: Orbit analysis, coverage analysis, LLM dialogue
* 🎬 **Screen Recording**: Supports screen recording and video director mode
* 📸 **Screenshot Function**: Supports screenshot and image management
* 🔍 **Search Function**: Powerful satellite and object search functionality

## **🚀 Quick Start**

### **Prerequisites**

* **Docker** (for deploying docsify to enable online user manual browsing) 
* **Node.js** (recommended 18.x or higher)  
* **npm** or **pnpm** package manager  
* Modern browser (Chrome, Firefox, Edge, etc.)
* **ScAI Backend** backend service (need to start backend service first)
* **ClickHouse** database (managed by backend service)

### **0. Start Backend Service**

Before using the frontend, you need to start the ScAI Backend service first. Please refer to [ScAI Backend README](https://github.com/tianxunweixiao/ScAI-backend/blob/main/README.md) for backend service installation and configuration.

Ensure the following backend services are started:
* **Account Management Service**: http://localhost:5001
* **Simulation Service**: http://localhost:8401
* **ClickHouse Database**: Port 8123 (HTTP) / 9000 (Native)

### **1. Environment Preparation**

```bash
# Clone repository  
git clone https://github.com/tianxunweixiao/ScAI-frontend.git   
cd ScAI-frontend

# Install dependencies  
npm i
# Or use pnpm
pnpm install
```

### **2. Environment Variable Configuration**

```bash
Copy example file and modify configuration:

cp .env.example .env

Edit .env file, focus on configuring the following:

# API configuration  
API_BASE_URL=http://localhost:8401 # server_backend
API_ACCOUNT_URL=http://localhost:5001 # account_backend

# Online user manual
USER_MANUAL_URL=http://localhost:3000

```

### **3. Build Project**

```bash
# docsify deployment
cd docs
docker build -t docs .
docker run -d   --name my-docs \
-p 3000:3000 \
-v $(pwd):/docs \
docs

# Production environment build
npm run build

```

### **4. Start Service**

```bash
# Start local development server
npm start

# Service will start at http://localhost:5544
```

## **📚 Usage Guide**

### **Core Architecture**

The main page loads a full-screen Canvas element for displaying Earth, satellites, and starry sky. UI elements are overlaid on the Canvas via DOM. Two Web Workers (positionCruncher.ts and orbitCruncher.ts) are responsible for continuously calculating satellite positions and updating orbit lines for highlighted objects.

The main rendering loop (drawManager.ts) is optimized to reduce memory leaks and maintain high FPS. This is typically achieved by having functions modify global variables rather than returning variables, and using long functions instead of splitting them into multiple functions—this is intentional.

Usage instructions for various plugins and functional modules can be found in the online user manual in the top-right corner of the main page.

<img width="2560" height="1440" alt="88ad034a54a84958b8c24d3b3144b7b8" src="https://github.com/user-attachments/assets/c269de40-e4e9-4e9a-a3ff-38130b60f2b6" />

### **Data Sources**

Refer to <https://api.keeptrack.space/v2/sats> for the latest satellite catalog.

## **🔧 Troubleshooting**

| Issue | Possible Causes and Troubleshooting |
| :---- | :---- |
| **Build Failure** | 1. Check if Node.js version meets requirements. 2. Delete node_modules and package-lock.json and reinstall dependencies. 3. Check if TypeScript configuration is correct. |
| **Poor Rendering Performance** | 1. Check if browser supports WebGL. 2. Reduce the number of objects rendered simultaneously. 3. Check if Web Workers are working properly. |
| **API Call Failure** | 1. Check if API addresses in .env configuration are correct. 2. Confirm if backend services are running normally. 3. Check network request logs in browser console. |
| **Test Failure** | 1. Ensure all dependencies are correctly installed. 2. Check test environment configuration. 3. View test logs for detailed error information. |

## **🤝 Contributing Guide**

We warmly welcome community developers to participate in the construction of ScAI Frontend! If you have any improvement suggestions or have discovered bugs, please follow the following process:

1. **Fork this repository**: Click the Fork button in the top-right corner to copy the project to your GitHub account.  
2. **Create a branch**: Create a new branch from the main branch for development.  
   ```bash
   git checkout -b feature/AmazingFeature
   ```  
3. **Commit changes**: Ensure code style is consistent and write clear commit messages.  
   ```bash
   git commit -m 'feat: Add some AmazingFeature'
   ```  
4. **Push branch**:  
   ```bash
   git push origin feature/AmazingFeature
   ```  
5. **Submit Pull Request**: Initiate a PR on GitHub and describe your changes in detail.

**Development Suggestions**:

* Follow TypeScript strict mode to ensure type safety.  
* Write corresponding unit tests when adding new features.  
* Pay attention to performance optimization and avoid memory leaks when modifying rendering logic.  
* Run `npm run lint` before submitting code to ensure consistent code style.

## **📄 License**

This project is licensed under the **GNU Affero General Public License v3.0**.

Copyright (c) 2025 Chengdu TianXun Microsatellite Technology Co., Ltd.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

## **📮 Contact**

For any questions, suggestions, or business cooperation needs, please contact the project maintenance team.

* **Email**: code@spacemv.com  
* **Issues**: [GitHub Issues](https://github.com/tianxunweixiao/ScAI-Frontend/issues)

For more information, please follow the company's WeChat official account:

<img width="106" height="106" alt="image" src="https://github.com/user-attachments/assets/69a02ad0-422c-422a-bf5f-9b7890cf31ab" />

## ✅ To-Do List

- [ ] **Intelligent Agent (Agent)**: Integrate AI Agent for automated constellation simulation task orchestration and scheduling.
- [ ] **Multi-Constellation Support**: Add preset support for navigation constellations and communication constellations.
- [ ] **STK Interface Enhancement**: Expand API coverage to support more fine-grained simulation parameter configuration
- [ ] **Improve Documentation**: Supplement detailed video tutorials and API interface use cases.
