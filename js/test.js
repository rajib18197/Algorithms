// Get data from an API
import { Client } from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: "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",
});

export const getData = async function (apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const countriesData = data
      .map((country) => {
        //   console.log(country);
        const language =
          country?.languages?.[Object.keys(country.languages)[0]];
        const currency =
          country?.currencies?.[Object.keys(country.currencies)[0]];

        return {
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country?.capital?.[0],
          flag: country.flags.png,
          language: language,
          currency: currency,
        };
      })
      .filter(
        (country) =>
          country.name &&
          country.population &&
          country.region &&
          country.capital &&
          country.flag &&
          country.language &&
          country.currency
      );

    await createNotionPage(countriesData[100]);
    // await Promise.all(
    //   countriesData.map(async (country, i) => {
    //     return await createNotionPage(country);
    //   })
    // );
  } catch (err) {
    console.error(err);
  }
};

const createNotionPage = async function (country) {
  try {
    const response = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: "126fa3ffcefa80c99282c61b7069c325",
      },

      properties: {
        Name: {
          title: [
            {
              type: "text",
              text: {
                content: country.name,
              },
            },
          ],
        },

        Flag: {
          files: [
            {
              type: "external",
              name: "Flag",
              external: {
                url: country.flag,
              },
            },
          ],
        },

        Currency: {
          rich_text: [
            {
              type: "text",
              text: {
                content: country.currency.name,
              },
            },
          ],
        },

        "Capital City": {
          rich_text: [
            {
              type: "text",
              text: {
                content: country.capital,
              },
            },
          ],
        },

        Region: {
          rich_text: [
            {
              type: "text",
              text: {
                content: country.region,
              },
            },
          ],
        },

        "Official Language": {
          rich_text: [
            {
              type: "text",
              text: {
                content: country.language,
              },
            },
          ],
        },
        Population: {
          number: country.population,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

getData(`https://restcountries.com/v3.1/all`);
