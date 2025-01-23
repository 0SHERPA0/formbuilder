import React from "react";
import { Link } from "react-router-dom";
import "./JsonViewer.css";

const JsonViewer = ({ schema }) => {
  return (
    <div className="json-viewer">
      <h3>Generated JSON Schema</h3>
      {schema ? (
        <pre className="schema-output">{JSON.stringify(schema, null, 2)}</pre>
      ) : (
        <p>No schema generated yet.</p>
      )}
      <Link to="/" className="back-button">
        Back to Form Builder
      </Link>
    </div>
  );
};

export default JsonViewer;
