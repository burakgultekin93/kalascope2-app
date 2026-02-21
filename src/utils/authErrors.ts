export const getAuthErrorMessage = (error: any): string => {
    if (!error) return 'Bilinmeyen bir hata oluştu.';

    const message = error.message?.toLowerCase();

    if (message?.includes('invalid login credentials')) return 'E-posta veya şifre hatalı.';
    if (message?.includes('user already registered')) return 'Bu e-posta adresi zaten kullanımda.';
    if (message?.includes('password should be at least 6 characters')) return 'Şifre en az 6 karakter olmalıdır.';
    if (message?.includes('invalid format')) return 'Geçersiz e-posta formatı.';

    return error.message || 'Bilinmeyen bir hata oluştu.';
};
