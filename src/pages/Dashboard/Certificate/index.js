import { useState } from 'react';
import { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useCertificate from '../../../hooks/api/useCertificate';
import useGenCertificate from '../../../hooks/api/useGenCertificate';
import pdfGen from '../../../utils/PDFGenerator';

export default function Certificate() {
  const { certificateError, certificateLoading } = useCertificate();
  const [errorMsg, setErrorMsg] = useState(null);
  const { genCertificate } = useGenCertificate();
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);

  useEffect(() => {
    if (!certificateLoading) {
      if (certificateError) {
        const errors = {
          'Ticket not paid': 'Você não participou do evento.',
          'Event is still ongoing': 'O certificado ficará disponível apenas 1 dia após a realização do evento.',
        };
        setErrorMsg(errors[certificateError.response.data]);
      }
      setFirstLoading(true);
    }
  }, [certificateLoading]);

  async function generateCertificate() {
    setLoading(true);
    try {
      const userCertData = await genCertificate();
      await pdfGen(userCertData);

      setLoading(false);
    } catch (error) {
      const errors = {
        'Not enough activities enrolled': 'Sem atividades suficiente',
      };
      toast(errors[error.response.data] || 'Ocorreu um erro');
    }
  }

  return (
    <DashboardContainer>
      <PageContainer>
        <h1>Certificado</h1>
        {!firstLoading && (
          <ErrorContainer>
            <ul>
              <Loader height={36} width={36} color="#848484" type="Oval" />
            </ul>
          </ErrorContainer>
        )}
        {errorMsg && firstLoading ? (
          <ErrorContainer>
            <ul>
              <div>{errorMsg}</div>
            </ul>
          </ErrorContainer>
        ) : (
          !errorMsg &&
          firstLoading && (
            <>
              <h2>Clique no botão abaixo para gerar seu certificado de participação.</h2>
              <PDFBTN disabled={loading} onClick={generateCertificate}>
                GERAR CERTIFICADO
              </PDFBTN>
            </>
          )
        )}
      </PageContainer>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  max-height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  h1 {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 34px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

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
`;

const ErrorContainer = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: -0.05em;
  text-align: center;
  color: #8e8e8e;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70%;
  height: 500px;
  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0px;
  }
`;

const PDFBTN = styled.button`
  background: #e0e0e0;
  box-shadow: 0px 2px 10px 0px #00000040;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  width: 175px;
  height: 37px;
  margin: 0 0 20px 10px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  :disabled {
    cursor: default;
  }
`;
