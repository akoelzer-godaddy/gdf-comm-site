const React = require('react');

function Card({ children, id, className }) {
  return React.createElement('div', { id, className }, children);
}

Card.spaceOptions = { SM: 'sm', MD: 'md', LG: 'lg', XL: 'xl' };

module.exports = Card;
module.exports.default = Card;
module.exports.spaceOptions = Card.spaceOptions;
