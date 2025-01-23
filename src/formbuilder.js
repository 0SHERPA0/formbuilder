import React, { useState, useMemo } from "react";
import{ z } from "zod";
import Input from "./component/input";
import Button from "./component/button";
import Checkbox from "./component/checkbox";
import Select from "./component/select";
import Radio from "./component/radio";
import Password from "./component/password";
import Label from './component/label';
import "./App.css";


const MemoizedLabel = React.memo(Label);
const MemoizedInput = React.memo(Input);
const MemoizedPassword = React.memo(Password);
const MemoizedButton = React.memo(Button);
const MemoizedCheckbox = React.memo(Checkbox);
const MemoizedSelect = React.memo(Select);
const MemoizedRadio = React.memo(Radio);

const componentsList = [
 { id: "label", type: "label", label: "Label Field", component: <Label>Label Field</Label> },

  { id: "input", type: "input", label: "Input Field", component: <Input label={"Name"} type={'text'}/> },
  { id: "email", type: "input", label: "Email", component:<Input label={"Email"} type={'email'} />},
  { id: "password", type: "password", label: "Password", component: <Input type={'password'} label={"Password"} /> },
  { id: "button", type: "button", label: "Button", component: <Button /> },
  { id: "checkbox", type: "checkbox", label: "Checkbox", component: <Checkbox /> },
  { id: "select", type: "select", label: "Select", component: <Select /> },
  {id: "gender", type: "radio", label: "Radio Button", component: <Radio />},
];
const emailValidation = z.string().email("Invalid email format");

const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character");

const formValidation = z.array(
  z.object({
    id: z.number().positive(),
    label: z.string().nonempty("Label is required"),
    email: z.optional(emailValidation), 
    password: z.optional(passwordValidation),
  })
);
const FormBuilder = () => {
  const [formComponents, setFormComponents] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false); 

  const handleDragStartNew = (component) => {
    window.draggedComponent = component;
  };

  const handleDropNew = (event) => {
    event.preventDefault();
    const component = window.draggedComponent;

    if (component) {
      setFormComponents([...formComponents, component]);
      
      window.draggedComponent = null;
    }
  };

  const handleDragStartComponent = (index) => {
    setDraggedIndex(index);
  };

  const handleDropComponent = (event, index) => {
    event.preventDefault();

    const reorderedComponents = [...formComponents];
    const draggedComponent = reorderedComponents.splice(draggedIndex, 1)[0];
    reorderedComponents.splice(index, 0, draggedComponent);

    setFormComponents(reorderedComponents);
    setDraggedIndex(null);
    validateForm(reorderedComponents);
  };

  const handleDragOverComponent = (event) => {
    event.preventDefault(); 
  };

  const generateSchema = useMemo(() => {
    return formComponents.map((component, index) => ({
      id: index + 1,
      type: component.type,
      label: component.label,
      email: component.type === "input" && component.label.toLowerCase().includes("email") ? "example@email.com" : undefined,
      password: component.type === "password" ? "Password123!" : undefined,
    }));
  },[formComponents]);
  
  const validateForm = (components) => {
    try {
      formValidation.parse(
        components.map((component, index) => ({
          id: index + 1,
          type: component.type,
          label: component.label,
          email: component.type === "input" && component.label.toLowerCase().includes("email") ? "example@email.com" : undefined,
          password: component.type === "password" ? "Password123!" : undefined,
        }))
      );
      setValidationErrors([]); 
    } catch (error) {
      if (error.errors) {
        setValidationErrors(error.errors.map((e) => e.message));
      }
    }
  };
  
  const handleButtonClick = () => {
    
    validateForm(formComponents);
    setIsButtonClicked(true); 
  };
  
  const handleLabelEdit = (index, newLabel) => {
  const updatedComponents = [...formComponents];
  updatedComponents[index].label = newLabel;
  setFormComponents(updatedComponents);
};

  return (
    <div className="form-builder">
      <div className="components-panel">
        <h3>Form Components</h3>
        <div className="components-list">
          {componentsList.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStartNew(item)}
              className="draggable-item"
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div
        className="form-preview"
        onDrop={handleDropNew}
        onDragOver={handleDragOverComponent}
      >
        <h3>Form Preview</h3>
        <div className="form-area">
          {formComponents.length === 0 ? (
            <p>Drag components here to build the form</p>
          ) : (
            formComponents.map((component, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStartComponent(index)}
                onDragOver={(event) => handleDragOverComponent(event)}
                onDrop={(event) => handleDropComponent(event, index)}
                className="form-component draggable-component"
              > {component.type === "label" ? (
                  <div className="editable-label">
                    <input
                      type="text"
                      value={component.label}
                      onChange={(e) => handleLabelEdit(index, e.target.value)}
                      className="label-input"
                    />
                  </div>
                ):component.type === "button" ? (
                  <Button onClick={handleButtonClick}>Submit</Button> 
                ) : (
                  component.component
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="json-viewer">
        <h3>JSON Schema</h3>
        {generateSchema.length === 0 ? (
          <p>No schema generated yet.</p>
        ) : (
          <pre className="schema-output">{JSON.stringify(generateSchema, null, 2)}</pre>
        )}
      </div>
      {validationErrors.length > 0 && (
        <div className="error-popup">
          <div className="error-popup-content">
            <h3>Validation Errors</h3>
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button onClick={() => setValidationErrors([])}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
