import styled, { css } from "styled-components";
import { Colors } from "../../constants/Colors";

const ButtonContainer = styled.div`
  width: 15%;
  height: 40px;
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.$customStyle}
  ${(props) => props.$buttonStyle}
  cursor: pointer;
  @media (max-width: 767px) {
    width: 55%;
  }
`;

const ButtonText = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  margin-bottom: 2px;
  @media (max-width: 767px) {
    font-size: 15px;
  }
`;

const getButtonStyle = (type) => {
  if (type == "btn") {
    return css`
      background-color: ${Colors.PRIMARY};
      color: black !important;
    `;
  } else {
    return css`
      background-color: transparent;
      color: #4e5968;
      @media (max-width: 767px) {
        visibility: hidden;
      }
    `;
  }
};

function Button({ children, onClick, style, type = "btn" }) {
  return (
    <ButtonContainer
      $customStyle={style}
      onClick={onClick}
      $buttonStyle={getButtonStyle(type)}
    >
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
}

export default Button;
