import React from "react";
import DeleteModalProps from "@/components/Modal/interface/ModalProps";
import Button from "@/components/button/Button";

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50" onClick={onCancel}>
            <div
                className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirmar exclusão</h2>
                <p className="text-gray-600 mb-6">Deseja realmente excluir esta imagem?</p>
                <div className="flex justify-end space-x-4">
                    <Button
                        label="Cancelar"
                        onClick={onCancel}
                        color="bg-blue-600 hover:bg-blue-700"
                        textColor="text-white"
                    />
                    <Button
                        label="Confirmar"
                        onClick={onConfirm}
                        color="bg-red-500 hover:bg-red-600"
                        textColor="text-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(DeleteModal);
