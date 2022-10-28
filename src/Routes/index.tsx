import { memo } from 'react';

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import CardConfirmation from 'pages/CardConfirmation';
import CheckoutLoading from 'pages/CheckoutLoading';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import TicketConfirmation from 'pages/TicketConfirmation';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/checkout/:id" element={<CheckoutLoading />} />
        <Route path="/cardconfirmation" element={<CardConfirmation />} />
        <Route path="/ticketconfirmation" element={<TicketConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
};

export default memo(Routes);
// path="/checkout/:id/cardconfirmation"
