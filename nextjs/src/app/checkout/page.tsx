"use client";

import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
} from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import { Button } from "../components/button/FormButton";

const steps = [
  {
    label: "Informações de Envio",
    description: (
      <>
        <TextField label="Nome Completo" fullWidth sx={{ marginBottom: 2 }} />
        <TextField label="Endereço" fullWidth sx={{ marginBottom: 2 }} />
        <TextField label="Cidade" fullWidth sx={{ marginBottom: 2 }} />
        <TextField label="CEP" fullWidth sx={{ marginBottom: 2 }} />
      </>
    ),
  },
  {
    label: "Informações de Pagamento",
    description: (
      <>
        <TextField
          label="Número do Cartão"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField label="Nome no Cartão" fullWidth sx={{ marginBottom: 2 }} />
        <TextField
          label="Data de Validade"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Código de Segurança"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
      </>
    ),
  },
  {
    label: "Revisão do Pedido",
    description: `Revise todos os detalhes do seu pedido antes de concluir. Certifique-se de que todas as informações estejam corretas.`,
  },
];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#121212",
          color: "white",
        }}
      >
        <Box sx={{ maxWidth: 500, width: "100%" }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      color:
                        activeStep === index
                          ? "white"
                          : "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiStepLabel-iconContainer": {
                      color: "white",
                    },
                  }}
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Box sx={{ marginBottom: 2 }}>{step.description}</Box>
                  <Box
                    sx={{
                      mb: 2,
                      flexDirection: "row",
                      display: "flex",
                      gap: 2,
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      variant="secondary"
                      color="secondary"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={handleNext}
                      variant="primary"
                      color="primary"
                    >
                      {index === steps.length - 1 ? "Finalizar" : "Continuar"}
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper
              square
              elevation={0}
              sx={{ p: 3, backgroundColor: "transparent", color: "white" }}
            >
              <Typography variant="h6" gutterBottom>
                Todos os passos foram concluídos - seu pedido está finalizado!
              </Typography>
              <Button onClick={handleReset} variant="primary" color="primary">
                Resetar
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    </>
  );
}
