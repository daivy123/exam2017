const axios = require("axios");
const fs = require("fs");
const R = require("ramda");

const getOneQuestions = async () =>
  axios
    .get(
      "https://res2.rrxiu.net/pluginAnswer/v2/answerView/get?wsiteGuid=2i0eh4&activeGuid=b0c6d159a8c3ed9d4a15fc54deb6510d&wxOpenId="
    )
    .then((res) => res.data.data.questionList);

async function main() {
  let questions = [];

  for (let i = 0; i < 100; i++) {
    let res = await getOneQuestions();
    questions.push(res);
    console.log(`${i + 1}/${100}完成`);
  }
  const str = JSON.stringify(questions);

  console.log(str);
  fs.writeFileSync("./safe.json", str, "utf-8");
}

const uniqFile = async () => {
  const str = fs.readFileSync("./safe.json", "utf-8");
  let res = JSON.parse(str);
  res = R.flatten(res);

  let nextQuestions = res.map((item) => {
    let answer = [];
    let obj = {
      id: item.id,
      title: item.question.replace(/\d\d\d\.|\d\d\.|\d\./,''),
      option: item.list.map((option) => option.value),
    };
    item.list.forEach((opt, i) => {
      if (opt.right) {
        answer.push(i);
      }
    });
    return { ...obj, answer };
  });
  let uniq = R.uniqBy(R.prop('id'),nextQuestions)
  uniq = uniq.map(({id,...item})=>item)
  fs.writeFileSync("./safe_uniq.json", JSON.stringify(uniq), "utf-8");
};

uniqFile();
