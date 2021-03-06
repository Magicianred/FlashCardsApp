import React, { useContext } from 'react';
import { Context } from '../providers/global-context.provider';
import { CardsContext } from '../providers/cards-context.provider';

import { updateCard, deleteCard } from '../services/cards.service';
import { getCookie } from '../utils/cookie';

import { FormGroup } from 'reactstrap';
import ModalContainer from './ModalContainer';
import CardForm from './CardForm';

const EditDeckModal = ({ deckId }) => {
	const { editCardModalIsOpen, toggleEditCardModal } = useContext(Context);
	const { saveNewCard, openedCard } = useContext(CardsContext);

	const handleUpdate = async (card) => {
		const token = getCookie('x-auth-token');
		try {
			await updateCard(card, token, deckId);
			saveNewCard();
			return true;
		} catch (error) {
			return false;
		}
	};

	const handleDeleteDeck = async (id) => {
		const token = getCookie('x-auth-token');
		try {
			await deleteCard({ id }, token, deckId);
			saveNewCard();
			toggleEditCardModal();
			return true;
		} catch (error) {
			return false;
		}
	};

	return (
		<ModalContainer show={editCardModalIsOpen} toggle={toggleEditCardModal} title="Update deck">
			<CardForm handleFetchData={handleUpdate} card={openedCard} successFunc={toggleEditCardModal}>
				<FormGroup>
					<input type="submit" className="btn btn-info btn-lg btn-block" value="Update" />
				</FormGroup>
				<FormGroup>
					<input
						className="btn btn-danger btn-lg btn-block"
						value="Delete"
						onClick={() => handleDeleteDeck(openedCard.id)}
					/>
				</FormGroup>
			</CardForm>
		</ModalContainer>
	);
};

export default EditDeckModal;
