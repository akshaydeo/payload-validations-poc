var yaml = require("js-yaml");

const isValidJson = (jsonPayload) => {
    try {
        JSON.parse(jsonPayload);
        return true;
    } catch (err) {
        return false;
    }
};

const isValidYaml = (yamlPayload) => {
    try {
        yaml.load(yamlPayload);
        return true;
    } catch (err) {
        return false;
    }
};

/**
 * Function to check validity of the payload
 * @param {string} payload
 * @param {string} checkFor Possible values json, yaml, xml and proto
 */
const validatePayload = (payload, checkFor) => {
    switch (checkFor) {
        case "json":
            return isValidJson(payload);
        case "yaml":
            return isValidYaml(payload);
        default:
            // Not verifying xml and proto at the moment
            return true;
    }
};

const validJson = `{
  "this": "that",
  "and": 1
}`;
const invalidJson = `{
  "this": "that",
  "and": 1`;

const validYaml = `version: 1
set: 2
array:
    - one
    - two
`;

const invalidYaml = `version: 1
set: 2
    array:
        - one
        - two
`;


console.log('for valid json', validatePayload(validJson, 'json'));
console.log('for invalid json', validatePayload(invalidJson, 'json'));

console.log('for valid yaml', validatePayload(validYaml, 'yaml'));
console.log('for invalid yaml', validatePayload(invalidYaml, 'yaml'));