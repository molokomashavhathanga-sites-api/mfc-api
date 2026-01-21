

CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL UNIQUE,          -- Bronze/Gold/Platinum
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  billing_cycle VARCHAR(20) NOT NULL DEFAULT 'monthly',  -- monthly/weekly/once_off
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE memberships (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id INT NOT NULL REFERENCES plans(id),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'active',  -- active/paused/cancelled/expired
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE class_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE,
  description TEXT,
  default_duration_minutes INT DEFAULT 60,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE class_sessions (
  id SERIAL PRIMARY KEY,
  class_type_id INT NOT NULL REFERENCES class_types(id) ON DELETE CASCADE,
  trainer_id INT REFERENCES users(id), -- ensure trainer is role='staff' in app logic
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP,
  capacity INT NOT NULL DEFAULT 20,
  location VARCHAR(100),
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled', -- scheduled/cancelled/completed
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE class_bookings (
  id SERIAL PRIMARY KEY,
  session_id INT NOT NULL REFERENCES class_sessions(id) ON DELETE CASCADE,
  member_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  booking_status VARCHAR(20) NOT NULL DEFAULT 'booked', -- booked/cancelled/waitlisted/no_show/attended
  booked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (session_id, member_id)
);

CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  membership_id INT REFERENCES memberships(id) ON DELETE SET NULL,
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'ZAR',
  status VARCHAR(20) NOT NULL DEFAULT 'due', -- due/paid/void/overdue
  issued_at TIMESTAMP DEFAULT NOW(),
  due_at TIMESTAMP
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  invoice_id INT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  provider VARCHAR(30) NOT NULL DEFAULT 'cash', -- cash/card/payfast/etc
  amount NUMERIC(10,2) NOT NULL,
  paid_at TIMESTAMP DEFAULT NOW(),
  reference VARCHAR(100)
);
