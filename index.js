const request = require("request-promise");

const hook = "T014JLF0QFQ/B014XJNP5A8/QWqH31tU9cyzaqyLyNMzglvF";

const getData = async () => {
  const json = await request({
    url: "http://www.json-generator.com/api/json/get/cfdSmuTCNu?indent=2",
    json: true,
  });

  return json.map((person) => ({
    age: person.age,
    email: person.email,
    gender: person.gender,
    name: person.name,
  }));
};

(async () => {
  try {
    const people = await getData();

    const slackBody = {
      mkdwn: true,
      text: `<!channel> This is a really great slack message!`,
      attachments: people.map((person) => ({
        color: "warning",
        text: `*${person.email}* and its name is ${person.name}, and he or she is ${person.age}`,
      })),
    };

    // post slack
    const res = await request({
      url: `https://hooks.slack.com/services/${hook}`,
      method: "POST",
      body: slackBody,
      json: true,
    });

    console.log(res);
  } catch (e) {
    console.error("error!", e);
  }
})();
