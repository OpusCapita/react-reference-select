let reactVersion = require('react/package.json').version;

const semver = require('semver');
const Enzyme = require('enzyme');
const Adapter = require(semver.lt(reactVersion, '16.0.0') ? 'enzyme-adapter-react-15' : 'enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });