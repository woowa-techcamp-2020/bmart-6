import React from 'react';
import Modal from 'react-modal';
import { Product } from '../../../types/data';
import { makeComma } from '../../../utils/functions';

const customStyle = {
  overlay: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'rgba(0,0,0,0.16)',
    zIndex: 100,
  },

  content: {
    width: '100%',
    height: '150px',
    top: 'auto',
    right: 'auto',
    left: 'auto',
    bottom: 0,
    background: 'var(--white)',
    padding: 0,
    borderRadius: '15px 15px 0px 0px',
  },
};

interface Props {
  product: Product;
  isOpen: boolean;
  onCartModalVisible: () => void;
}
function AddCartModal(props: Props) {
  const { product, isOpen, onCartModalVisible } = props;
  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={500}
      style={customStyle}
      onRequestClose={onCartModalVisible}
    />
  );
}

export default AddCartModal;
