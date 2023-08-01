import styled from 'styled-components';

export default function HotelListing() {
  return (
    <PageContainer>
      <h2>Primeiro, escolha seu hotel</h2>
      <ul>
        <li>
          <img
            src="https://cdn.discordapp.com/attachments/376089859372089355/1135933675431796826/Grand-Hyatt-RJ-1.png"
            alt="HotelImg"
          />
          <h3>Driven Resort</h3>
          <div>
            <div>
              <p>Tipos de acomodação:</p>
              <span>Single e Double</span>
            </div>
            <div>
              <p>Vagas disponíveis:</p>
              <span>103</span>
            </div>
          </div>
        </li>
      </ul>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  gap: 18px;

  h2 {
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #8e8e8e;
  }

  ul {
    width: 100%;
    overflow-x: scroll;
    scroll-behavior: smooth;
    display: flex;
    gap: 19px;
    ::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #c9c6c6;
      border-radius: 4px;
    }
  }

  li {
    display: flex;
    flex-direction: column;
    min-width: 196px;
    height: 264px;
    border-radius: 10px;
    background: #ebebeb;
    padding: 16px 14px;
    gap: 10px;
    color: #3c3c3c;

    img {
      width: 100%;
      height: 109px;
      border-radius: 5px;
      object-fit: cover;
    }

    h3 {
      font-size: 20px;
      font-weight: 400;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: left;
      color: #343434;
    }

    > div {
      gap: 14px;
    }

    div {
      display: flex;
      flex-direction: column;

      p {
        font-size: 12px;
        font-weight: 700;
        line-height: 14px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 2px;
      }

      span {
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 0em;
        text-align: left;
      }
    }
  }
`;
