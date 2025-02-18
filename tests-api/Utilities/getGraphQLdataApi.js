const murrayApiGraphqlUrl = "https://murrayapi-uat.grays.com.au/data/api/graphql/";
import{token} from './authorizationToken';


async function getGraphQlApiResponse(request, data) {
    const response = await request.post(murrayApiGraphqlUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    });
  
    return response;
  }
  module.exports={getGraphQlApiResponse}