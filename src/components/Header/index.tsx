import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface ModalProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }:ModalProps) {
    return (
        <Container>
            <Content >
                <img src={logoImg} alt="dt money" />
                    <button type="button" onClick={onOpenNewTransactionModal}> 
                        Nova Transação
                    </button>
            </Content>
        </Container>
    )
}