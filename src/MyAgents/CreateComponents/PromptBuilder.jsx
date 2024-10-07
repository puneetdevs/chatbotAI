import React, { useEffect } from "react";
import { useFormData } from "../FormDataContext";

const PromptBuilder = ({ mode, updatedData }) => {
  const { formData, setFormData } = useFormData();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      agent_prompts: { ...formData?.agent_prompts, task_1: { [name]: value } },
    });
  };

  useEffect(() => {
    const updateData = () => {
      updatedData(formData);
    };
    updateData();
  }, [formData]
  );


  return (
    <div className="Agentform promptBuilder">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-14">
              <div className="mb-3" id="Prompttext">
                <label>Prompt Builder:</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  name="system_prompt"
                  rows="20"
                  value={formData?.agent_prompts?.task_1?.system_prompt}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PromptBuilder;
