interface formDataType{
    name: string;
    email: string;
    contact: string;
    address: string
}

export const validate = (formData: formDataType) => {
    const newErrors: formDataType = {
      name: "",
      email: "",
      contact: '',
      address: "",
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (formData.email.trim() && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required.";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Phone no. must be 10 digits.";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required.";

    return Object.fromEntries(
      Object.entries(newErrors).filter(([_, v]) => v !== "")
    );
  };