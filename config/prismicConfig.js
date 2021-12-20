import fetch from 'node-fetch';
import * as prismic from '@prismicio/client';

export const repoName = `my-express-website`; // Fill in your repository name.
const accessToken = ``; // If your repo is private, add an access token.
const endpoint = prismic.getEndpoint(repoName); // Format your endpoint.

// The `routes` property is your Route Resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
  {
    type: 'homepage',
    path: '/',
  },
];

export const client = prismic.createClient(endpoint, {
  fetch,
  accessToken,
  routes,
});
