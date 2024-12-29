<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'LoginView',
})
import { Button } from '@onvp/ui/components/Button'
import { Card } from '@onvp/ui/components/Card'
import { Checkbox } from '@onvp/ui/components/Checkbox'
import { Divider } from '@onvp/ui/components/Divider'
import type { FormSubmitEvent } from '@onvp/ui/components/Form'
import { Form, FormField, Message, yupResolver } from '@onvp/ui/components/Form'
import { InputText } from '@onvp/ui/components/InputText'
import { Password } from '@onvp/ui/components/Password'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

import type { LoginPayload } from '@/modules/auth/domain/types'
import { useAuthStore } from '@/modules/auth/infrastructure/store/useAuthStore.ts'
import { ROUTES } from '@/modules/core/application/router/routes'
import { useUserController } from '@/modules/user/domain/user.controller.ts'
import { useUserStore } from '@/modules/user/infrastructure/store/useUserStore.ts'

import { useAuthController } from '../../domain/auth.controller'

const authController = useAuthController()
const userController = useUserController()
const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()

const initialValues = ref({
  email: '',
  password: '',
  remember_me: true,
} satisfies LoginPayload)

const resolver = yupResolver(
  yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
    remember_me: yup.boolean(),
  })
)

async function onLoginWithGoogle() {
  if (authStore.isAuthenticated) {
    router.push({ name: ROUTES.live.name })
    return
  }

  try {
    // first check if user is already logged in
    await userController.getUser()
    const user = userStore.user

    if (user) {
      router.push({ name: ROUTES.live.name })
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    authController.onSubmitGoogleForm()
  }
}

async function onSubmit(val: FormSubmitEvent) {
  if (val.valid) {
    await authController.onLogin(val.values as LoginPayload)
    const redirect =
      (router.currentRoute.value.query.redirect as string) || ROUTES.live.path
    router.push(redirect)
  }
}
</script>
<template>
  <div class="min-h-screen flex-centered">
    <Card>
      <template #header>
        <div class="text-center mb-8 pt-5">
          <div
            class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4"
          >
            Welcome Back
          </div>
          <Button
            variant="outlined"
            icon="pi pi-google"
            label="Sign in with Google"
            @click="onLoginWithGoogle"
          />
        </div>
        <Divider align="center" type="solid">
          <b>OR</b>
        </Divider>
      </template>

      <template #content>
        <Form
          :initial-values
          :resolver
          class="flex flex-col gap-4 w-full sm:w-80"
          @submit="onSubmit"
        >
          <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
            <InputText
              type="email"
              placeholder="Email"
              autocomplete="username"
            />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $field.error?.message }}
            </Message>
          </FormField>
          <FormField
            v-slot="$field"
            name="password"
            class="flex flex-col gap-1"
          >
            <Password
              type="password"
              placeholder="Password"
              :feedback="false"
              toggle-mask
              fluid
              :input-props="{ autocomplete: 'current-password' }"
            />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $field.error?.message }}
            </Message>
          </FormField>
          <FormField
            name="remember_me"
            class="flex items-center justify-between gap-1"
          >
            <div class="flex gap-1">
              <Checkbox input-id="remember_me" binary />
              <label for="remember_me">Remember me</label>
            </div>
            <Button
              variant="link"
              severity="secondary"
              label="Forgot Password?"
            />
          </FormField>
          <Button
            :loading="authController.loadingState.onLogin"
            type="submit"
            severity="secondary"
            label="Login"
          />
        </Form>
      </template>
      <template #footer>
        <div class="flex items-center justify-between">
          <span
            class="text-surface-600 dark:text-surface-200 font-medium leading-normal"
          >
            Don't have an account?
          </span>
          <Button variant="link" severity="secondary" label="Sign Up" />
        </div>
      </template>
    </Card>
  </div>
</template>
