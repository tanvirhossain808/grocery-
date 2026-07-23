import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { MailIcon } from "lucide-react";

const NewsLetter = () => {
  return (
    <section className="bg-white py-16 px-4 xm:px-6 lg:px-8 rounded-3xl mx-auto shadow-xs mt-32 mb-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="size-16 bg-white rounded-xl flex-center mx-auto mb-6 shadow">
          <MailIcon className="size-8 text-app-green" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-semibold text-app-green mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-app-text-light mb-8 text-base">
          Get weekly updates on fresh produce, seasonal offers, and exclusive
          discounts right to your inbox.
        </p>
        <Form
          className="flex gap-3 flex-col sm:flex-row  max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextField
            className="flex-1 w-full border-none focus:border-none"
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            {/* <Label>Email</Label> */}
            <Input
              className="w-full px-5 py-3.5 rounded-xl border border-app-border bg-white text-sm outline-none ring-0
               
               data-[focused=true]:ring
               data-[focused=true]:ring-app-green"
              placeholder="Please enter your email id"
            />
            <FieldError />
          </TextField>
          <Button
            type="submit"
            className="px-8 py-3.5 h-full bg-app-green text-white font-semibold rounded-xl hover:bg-app-green-light translation-colors shadow-sm whitespace-nowrap active:scale-[0.98] w-full sm:w-auto"
          >
            Subscribed
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default NewsLetter;
