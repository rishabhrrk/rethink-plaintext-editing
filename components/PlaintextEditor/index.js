import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertToRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import css from './style.css';

function PlaintextEditor({ file, write }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    (async () => {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromText(await file.text())
        )
      );
    })();
  }, [file]);

  const changeText = val => {
    const nextState = RichUtils.toggleInlineStyle(editorState, val);
    console.log(val)
    setEditorState(nextState);
  };

  const saveText = () => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    const newFile = new File([value], file.name, {
      type: file.type,
      lastModified: new Date(Date.now())
    })
    write(newFile);
  };

  return (
    <div className={css.app}>
      <h2>{path.basename(file.name)}</h2>
      <div className={css.formatbar}>
      <button
            className={css.formatoption}
            style={{fontWeight:"bold"}}
            value="BOLD"
            onClick={e => changeText(e.target.value)}
          >
            Bold
          </button>

          <button
            className={css.formatoption}
            style={{fontStyle:"italic"}}
            value="ITALIC"
            onClick={e => changeText(e.target.value)}
          >
            Italic
          </button>

          <button
            className={css.formatoption}
            style={{textDecoration:"Underline"}}
            value="UNDERLINE"
            onClick={e => changeText(e.target.value)}
          >
            Underline
          </button>

          <button
            className={css.formatoption}
            style={{textDecoration:"line-through"}}
            value="STRIKETHROUGH"
            onClick={e => changeText(e.target.value)}
          >
            Strikethrough
          </button>

          <button className={css.formatoption} style={{backgroundColor:"rgba(56, 170, 52, 0.536)",color:"white"}}onClick={saveText}>
            SAVE
          </button>
          </div>
        <div className={css.editor}>
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
}

export default PlaintextEditor;
