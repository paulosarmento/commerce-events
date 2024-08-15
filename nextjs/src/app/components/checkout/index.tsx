"use client";

import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { Button } from "../button/FormButton";
import { Total } from "../Total";
import { removeItemFromCartAction } from "@/app/server-actions/cart.action";
import { Delete as DeleteIcon } from "@mui/icons-material";

export default function Checkout({
  cart,
  products,
}: {
  cart: any;
  products: any;
}) {
  const steps = [
    {
      label: "Informações de Envio",
      description: <></>,
    },
    {
      label: "Informações de Pagamento",
      description: <></>,
    },
    {
      label: "Revisão do Pedido",
      description: (
        <Box sx={{ mb: 2 }}>
          {cart.items.map((item: any, index: any) => {
            const product = products.find((p: any) => p.id === item.product_id);
            return (
              <Box key={item.product_id} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <ListItemAvatar>
                    <Avatar
                      src={product?.images?.[0]?.src}
                      alt={product?.name}
                      sx={{ width: 64, height: 64 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {product?.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "primary.main" }}
                        >
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(item.total)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 1,
                        }}
                      >
                        <Typography>Quantidade: {item.quantity}</Typography>
                        <form
                          action={removeItemFromCartAction}
                          style={{ marginLeft: "auto" }}
                        >
                          <input type="hidden" name="index" value={index} />
                          <Button type="submit" variant="red">
                            Excluir
                            <DeleteIcon />
                          </Button>
                        </form>
                      </Box>
                    }
                  />
                </Box>

                <Divider />
              </Box>
            );
          })}
          <Box sx={{ mt: 2, justifyContent: "flex-end", display: "flex" }}>
            <Total total={cart.total} />
          </Box>
        </Box>
      ),
    },
  ];

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
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Box sx={{ mb: 2, color: "black" }}>{step.description}</Box>
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
                <Button onClick={handleNext} variant="primary" color="primary">
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
          sx={{
            p: 3,
            backgroundColor: "transparent",
            color: "black",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Todos os passos foram concluídos - seu pedido está finalizado!
          </Typography>
          <Button onClick={handleReset} variant="primary" color="primary">
            Resetar
          </Button>
        </Paper>
      )}
    </>
  );
}
