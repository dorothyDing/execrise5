function Base(options) {
    console.log(options);
}
Base.extend = function () {
    return new Base(Array.prototype.slice.call(arguments));
}

module.exports = Base