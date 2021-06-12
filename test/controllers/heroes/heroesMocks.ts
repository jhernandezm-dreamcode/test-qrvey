export const RequestHeroes = {
  createHero: {
    alias: "Hulk",
    species: "Human",
    company: {
      name: "Marvel",
      team: "Avenger",
    },
    name: "Bruce",
  },
};

export const DynamoResponses = {
  insertSuccess: {
    statusCode: 200,
    body: {
      status: "success",
      message: "OK",
      description: "Message sent successfully",
    },
  },
};

export const SuccesResponse = {
    insertOne:{"code":200,"status":"SUCCESS","body":{"alias":"Hulk","species":"Human","company":{"name":"Marvel","team":"Avenger"},"name":"Bruce"}},
    
}
