import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Field = ({ index, field, onChange, onRemove }) => {
  const handleKeyChange = (e) => {
    onChange(index, { ...field, key: e.target.value });
  };

  const handleTypeChange = (value) => {
    const updated = { ...field, type: value };
    if (value === "nested") {
      updated.children = field.children || [];
    } else {
      delete updated.children;
    }
    onChange(index, updated);
  };

  const handleRequiredChange = (checked) => {
    onChange(index, { ...field, required: checked });
  };

  const handleAddNested = () => {
    const updated = {
      ...field,
      children: [...(field.children || []), { key: "", type: "string", required: false }],
    };
    onChange(index, updated);
  };

  const handleNestedChange = (childIndex, updatedChild) => {
    const newChildren = field.children.map((child, i) =>
      i === childIndex ? updatedChild : child
    );
    onChange(index, { ...field, children: newChildren });
  };

  const handleNestedRemove = (childIndex) => {
    const newChildren = field.children.filter((_, i) => i !== childIndex);
    onChange(index, { ...field, children: newChildren });
  };

  return (
    <div className="ml-4 mt-4 border-l border-gray-200 pl-4">
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Field name"
          value={field.key}
          onChange={handleKeyChange}
          className="w-[150px]"
        />

        <Select value={field.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nested">Nested</SelectItem>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="objectId">ObjectId</SelectItem>
            <SelectItem value="float">Float</SelectItem>
            <SelectItem value="boolean">Boolean</SelectItem>
            <SelectItem value="array">Array</SelectItem>
          </SelectContent>
        </Select>

        <Switch
          checked={field.required}
          onCheckedChange={handleRequiredChange}
        />

        <Button variant="ghost" size="icon" onClick={() => onRemove(index)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {field.type === "nested" && (
        <div className="mt-2">
          {field.children?.map((child, i) => (
            <Field
              key={i}
              index={i}
              field={child}
              onChange={(idx, updated) => handleNestedChange(idx, updated)}
              onRemove={(idx) => handleNestedRemove(idx)}
            />
          ))}
          <Button
            size="sm"
            variant="outline"
            className="mt-2"
            onClick={handleAddNested}
          >
            Add Nested Field
          </Button>
        </div>
      )}
    </div>
  );
};

export default Field;
