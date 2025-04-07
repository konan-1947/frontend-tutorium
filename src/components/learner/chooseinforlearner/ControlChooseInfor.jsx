import React, { useState, useEffect } from 'react';
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
    console.log(`Chuyển sang bước ${step + 1}`);
    console.log('Dữ liệu hiện tại:', formData);
    setStep(step + 1);
  };

  const prevStep = () => {
    console.log(`Quay lại bước ${step - 1}`);
    setStep(step - 1);
  };

  useEffect(() => {
    console.log('Step hiện tại:', step);
  }, [step]);

  return (
    <div>
      {step === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
        />
      )}
    </div>
  );
};

export default App;
