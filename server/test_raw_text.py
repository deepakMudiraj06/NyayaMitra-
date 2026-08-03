from app.services.pdf_loader import extract_pdf_text

text = extract_pdf_text("legal_documents/motor_vehicle_act.pdf")

print(text[:8000])