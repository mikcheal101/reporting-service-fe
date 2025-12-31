import React, { useEffect } from 'react';

const CustomAlertDialog = ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: () => void }) => {
    useEffect(() => {
        if (isOpen) {
            const firstButton = document.querySelector('.modal button');
            if (firstButton) {
                (firstButton as HTMLElement).focus();
            }
        }
    }, [isOpen]);

    if (!isOpen) return null; // Return nothing if the modal is not open

    return (
        <div className="modal fixed inset-0 flex items-center justify-center">
            <div className="modal-content bg-white rounded-lg shadow-lg p-6 w-80">
            <div className="flex flex-col items-center justify-center text-center">
                    <h2 className="text-xl font-semibold">Confirm Report Scheduling</h2>
                    <p className="mt-2 text-sm text-gray-700">
                        Are you sure you want to schedule this report? This action cannot be undone.
                    </p>
                    <div className="mt-4 flex justify-end space-x-14">
                        <button 
                            className="px-4 py-2 bg-gray-300 text-sm font-medium text-gray-800 rounded-md"
                            onClick={onClose}>
                            No
                        </button>
                        <button 
                            className="px-4 py-2 bg-blue-600 text-sm font-medium text-white rounded-md"
                            onClick={onConfirm}>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomAlertDialog;
