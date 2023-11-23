const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from .env file
require("dotenv").config();

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Get ether balance by address
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Get latest ether price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        ethDataSource: new EtherDataSource(),
    }),
});

// Set server timeout to 0
server.timeout = 0;

// Start server and listen on port 9000
server.listen("9000").then(({ url }) => {
    // Log message when server is ready
    console.log(`🚀 Server ready at ${url}`)
});

