import React, { useState } from 'react';
import Step1 from './ChooseCategory';
import Step2 from './ChooseAddress';
import Step3 from './ChooseWallet';
import '../../../../src/assets/css/ChooseCustomInfo.css';

const App = () => {
  const [formData, setFormData] = useState({
    category: '',
    address: '',
    wallet: '',
  });
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
      {step === 1 && (
        <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />
      )}
      {step === 2 && (
        <Step2 formData={formData} setFormData={setFormData} prevStep={prevStep} nextStep={nextStep} />
      )}
      {step === 3 && (
        <Step3 formData={formData} setFormData={setFormData} prevStep={prevStep} />
      )}
    </div>
  );
};

export default App;
