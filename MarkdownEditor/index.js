import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import PropTypes from 'prop-types';
import path from 'path';

import css from './style.css';

function MarkdownEditor({ file, write }) {
  const [input, setInput] = useState();
  useEffect(() => {
    (async () => {
      setInput(await file.text());
    })();
  }, [file]);
  return (
    <div className={css.outer}>
      <h2 style={{textAlign:"center"}}>{path.basename(file.name)}</h2>
      <div className={css.App}>
      <textarea className={css.editor} value={input} onChange={(e) => {
        setInput(e.target.value)
      }}></textarea>
      <ReactMarkdown source={input} className={css.preview} renderers={{
        code: Component,
      }}/>
      </div>
    </div>
  );
};


const Component = ({value, language}) => {
  // const codeString = '(num) => num + 1';
  return (
    <SyntaxHighlighter language={language ?? null} style={dark}>
      {value ?? ''}
    </SyntaxHighlighter>
  );
};

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
