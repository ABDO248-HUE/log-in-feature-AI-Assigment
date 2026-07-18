import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { LoginForm } from './LoginForm';

describe('LoginForm Component', () => {
  it('renders login form with necessary structural components', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('keeps the submit button disabled until valid data is input', () => {
    render(<LoginForm />);
    const submitBtn = screen.getByRole('button', { name: /sign in/i });
    
    expect(submitBtn).toBeDisabled();

    // Fill valid email but invalid password
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    expect(submitBtn).toBeDisabled();

    // Fill valid password
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'strongpassword123' } });
    expect(submitBtn).not.toBeDisabled();
  });

  it('displays real-time input format error notifications', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Enter bad formatting
    fireEvent.change(emailInput, { target: { value: 'bademail' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/password must be at least 8 characters/i)).toBeInTheDocument();
  });

  it('toggles password visibility field on trigger click', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    const toggleBtn = screen.getByRole('button', { name: /show password/i });

    expect(passwordInput.type).toBe('password');

    // Click to show
    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe('text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
  });

  it('shows loading animation spinner and logs in successfully', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'safePassword999' } });
    
    fireEvent.click(submitBtn);

    // Expect loading state immediately on validation success
    expect(submitBtn).toBeDisabled();
    
    // Wait for mock authentication delay
    await waitFor(() => {
      expect(screen.getByText(/successfully signed in!/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});