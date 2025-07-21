import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Field from "./Field";

const SchemaBuilder = () => {
  const [fields, setFields] = useState([]);

  const handleAdd = () => {
    setFields([...fields, { key: "", type: "", required: false }]);
  };

  const handleRemove = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleChange = (index, updatedField) => {
    setFields(fields.map((field, i) => (i === index ? updatedField : field)));
  };

  const buildJsonSchema = (fieldsArray) => {
  const obj = {};
  fieldsArray.forEach((field) => {
    if (!field.key) return;

    if (field.type === "nested") {
      obj[field.key] = buildJsonSchema(field.children || []);
    } else {
      obj[field.key] = field.type;
    }
  });
  return obj;
};


  const jsonOutput = buildJsonSchema(fields);

  return (
    <div className="flex gap-6 p-6">
      <div className="w-2/3">
        <h2 className="text-lg font-bold mb-4">Schema Builder</h2>

        {fields.map((field, index) => (
          <Field
            key={index}
            index={index}
            field={field}
            onChange={handleChange}
            onRemove={handleRemove}
          />
        ))}

        <div className="flex gap-2 mt-4">
          <Button onClick={handleAdd}>Add +</Button>
          <Button disabled={fields.length === 0}>Submit</Button>
        </div>
      </div>

      <div className="w-1/3 bg-gray-100 p-4 rounded text-sm font-mono overflow-auto h-[80vh]">
        <h3 className="font-semibold mb-2">Live JSON Output</h3>
        <pre>{JSON.stringify(jsonOutput, null, 2)}</pre>
      </div>
    </div>
  );
};

export default SchemaBuilder;
