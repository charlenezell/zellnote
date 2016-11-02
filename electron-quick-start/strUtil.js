var StrGen = {
  range: function (_from, _to) {
      _from=parseInt(_from),_to=parseInt(_to);
    if (_from == _to) {
      return [_from];
    } else {
      let r = []
      for (var i = _from; _from < _to && i <= _to || _from > _to && i >= _to; _from > _to ? i-- : i++) {
        r.push(i);
      }
      return r;
    }

  }
};
exports.range=StrGen.range;