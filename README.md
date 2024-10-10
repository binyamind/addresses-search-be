# Node.js Elasticsearch Address Search

This Node.js application connects to Elasticsearch to search for addresses. It also automatically converts and loads addresses from a pre-existing CSV file into Elasticsearch using the `csvtojson` package.

## Prerequisites

- **Node.js** installed
- **Docker** and **Docker Compose** installed
- **Elasticsearch** running via Docker

## Getting Started

### 1. Clone the repository

- **SSH:**
  ```bash
  git clone git@github.com:binyamind/addresses-search-be.git
  ```
- **https:**  
   ```bash
  git clone https://github.com/binyamind/addresses-search-be.git
    ```
```bash
cd to the repo
```  
  
# 2. Install dependencies
```
npm install
```
# 3. Environment Variables
An .env file is already included in the project for simplicity. The following variables are used:
```
PORT=3000
ELASTIC_SEARCH_USERNAME='elasticusername'
ELASTIC_SEARCH_PASSWORD='Pq.eF%R&@(]%Y?3J2aD31p$S'
ELASTICSEARCH_HOSTS='http://elasticsearch:9200'
ELASTICSEARCH_NODE='http://localhost:9200'
```
- PORT: The port number for the Node.js application.
- ELASTIC_SEARCH_USERNAME: The username for authenticating with Elasticsearch.
- ELASTIC_SEARCH_PASSWORD: The password for authenticating with Elasticsearch.
- ELASTICSEARCH_HOSTS: The Elasticsearch hosts URL, typically set for Docker.
- ELASTICSEARCH_NODE: The local Elasticsearch node URL.
These values are pre-configured, but you can adjust them as needed.

# 4. Load CSV data into Elasticsearch
A CSV file with address data is already included in the project. When you run the app, the file will automatically be converted to JSON and uploaded to Elasticsearch.

# 5. Build and start Elasticsearch
To build and start Elasticsearch using Docker, use the following commands:

#### Start Elasticsearch

```bash
npm run start:elastic
```
If the service does not work properly, try rebuilding Elasticsearch with:
```bash
npm run build:elastic
```
# 6. Start the Node.js Application
Once Elasticsearch is running, start the Node.js app:

```bash
npm run start:dev

```
# 7. Address Search API
The app provides an API that allows you to search for addresses from the data loaded into Elasticsearch.

## Dependencies

- **Node.js**
- **csvtojson**: For converting CSV data to JSON
- **Docker & Docker Compose**: For managing Elasticsearch container
- **Elasticsearch**
