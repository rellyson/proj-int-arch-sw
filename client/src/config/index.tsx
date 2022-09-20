export default {
  API_URL: 'http://localhost:8000/api',
  IDP_SSO_URL:
    'http://keycloak:8080/realms/pass-manager/protocol/openid-connect/auth?client_id=client-app&redirect_uri=http://localhost:3000/signin/callback&response_type=token&scope=profile&kc_locale=pt-BR',
}
