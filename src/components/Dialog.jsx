import React from 'react';
import { Dialog as BaseDialog } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <BaseDialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
          <button className="absolute top-2 right-2" onClick={() => onOpenChange(false)}>
            <X size={20} />
          </button>
          {children}
        </div>
      </div>
    </BaseDialog>
  );
};

export const DialogContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export const DialogTitle = ({ children }) => {
  return <h2 className="text-xl font-bold mb-2">{children}</h2>;
};
