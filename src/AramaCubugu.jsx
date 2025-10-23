

import React from 'react';


function AramaCubugu({ aramaMetni, onSearch, onFocus, onBlur, onKeyDown }) {
  return (
    <div className="arama-cubugu">
      <input
        id="arama"
        type="text"
        value={aramaMetni}
        onChange={onSearch}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown} // Enter tuşunu yakalamak için eklendi
        placeholder="Arama yapmak için yazıp Enter'a basın..."
      />
    </div>
  );
}

export default AramaCubugu;