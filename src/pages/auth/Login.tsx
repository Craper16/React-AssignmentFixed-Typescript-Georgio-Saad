import React, { useEffect } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Card,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../redux/hooks';
import { useSignInUserMutation } from '../../redux/api/authApi';
import { setUser } from '../../redux/auth/authSlice';
import { Formik, Form } from 'formik';
import { loginValidationSchema } from '../../validation/validation';
import { useNavigate } from 'react-router';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signInUser, { data, isLoading, isError, error, isSuccess }] =
    useSignInUserMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ accessToken: data.accessToken }));
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/');
    }
  }, [isSuccess, dispatch, data?.accessToken, navigate]);

  return (
    <>
      <Formik
        initialValues={{ username: '', password: '' }}
        validateOnMount={true}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          signInUser({ ...values });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Card
            variant={'elevated'}
            style={{
              margin: 'auto',
              padding: 8,
              display: 'flex',
              height: 310,
              width: 600,
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <Form
              onSubmit={handleSubmit}
              style={{
                justifyItems: 'center',
                alignItems: 'center',
                width: '80%',
              }}
            >
              <FormControl
                isInvalid={!!errors.username && touched.username}
                isRequired
              >
                <FormLabel
                  htmlFor="username"
                  style={{ textAlign: 'center', color: '#8A2BE2' }}
                >
                  Username
                </FormLabel>
                <Input
                  id="username"
                  onChange={handleChange('username')}
                  value={values.username}
                  onBlur={handleBlur('username')}
                  type="text"
                  placeholder="Enter username"
                />
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.password && touched.password}
                isRequired
              >
                <FormLabel
                  htmlFor="password"
                  style={{ textAlign: 'center', color: '#8A2BE2' }}
                >
                  Password
                </FormLabel>
                <Input
                  id="password"
                  onChange={handleChange('password')}
                  value={values.password}
                  onBlur={handleBlur('password')}
                  type="password"
                  placeholder="Enter password"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                padding={6}
                height={50}
                width="full"
                type="submit"
                colorScheme="purple"
                isDisabled={!isValid || isLoading}
                isLoading={isLoading}
              >
                Login
              </Button>
              {isError && (
                <Text
                  p={5}
                  color="tomato"
                  align="center"
                >
                  {(error as any).data?.message || (error as any).error}
                </Text>
              )}
            </Form>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default Login;
