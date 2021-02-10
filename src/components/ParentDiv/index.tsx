import styled from 'styled-components';

export const ParentDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #e8fccf;
  overflow: auto;
  padding: 20px;

  & .avatar,
  & .detalhes,
  & .btnSave {
    margin-top: 50px;
  }

  & .avatar {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }

  & .instool {
    margin-top: 0px;
    margin-bottom: 0px;
    height: 100px;
    width: auto;
  }
`;
