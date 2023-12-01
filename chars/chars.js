const fs = require("fs");
const path = require("path");
const joi = require("joi");

let chars = require("./chars.json");

const charSchema = joi.object({
  id: joi.number().required(),
  nazwa: joi.string().required(),
  opis: joi.string().required(),
  cena: joi.number().min(0).required(),
})

const addChar = (charData) => {
  const { error } = charSchema.validate(charData);

  if (error) {
    throw new Error(`Validation error: ${error.details.map((detail) => detail.message).join(', ')}`);
  }

  charData.id = getNextId();
  chars.push(charData);
  save();
  return getCharacter(charData.id);
};


const copy = (obj) => JSON.parse(JSON.stringify(obj));

const findCharById = (id) => chars.find((char) => char.id == id);

const getCharacter = (id) => copy(findCharById(id));

const listCharacters = () => copy(chars);

const getNextId = () => {
  let lastChar = chars[chars.length - 1];
  return lastChar ? lastChar.id + 1 : 1;
};

const save = () => {
  fs.writeFile(
    path.join(__dirname, "chars.json"),
    JSON.stringify(chars, null, 4),
    (err) => {
      if (err) console.log(`Nie można zapisać: ${err}`);
      else console.log("Zapisano");
    }
  );
};

const updateChar = (charData) => {
  const { error } = joi.object({
    id: joi.number().integer().min(1).required(),
    nazwa: joi.string().required(),
    opis: joi.string().required(),
    cena: joi.number().min(0).required(),
  }).validate(charData);

  if (error) {
    throw new Error(`Validation error: ${error.details.map((detail) => detail.message).join(', ')}`);
  }

  let char = findCharById(charData.id);
  if (!char) {
    throw new Error(`Character with ID ${charData.id} not found.`);
  }

  Object.assign(char, charData);
  save();
  return getCharacter(char.id);
};


const deleteChar = (id) => {
    console.log(`delte id ${id}`);
    let char = findCharById(id)
    let index = chars.indexOf(char);
    chars.splice(index, 1)
    save()
    return copy(char)
}

module.exports = {
  list: listCharacters,
  get: getCharacter,
  add: addChar,
  update: updateChar,
  delete: deleteChar,
};