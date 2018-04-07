class Rational implements Comparable<Rational>
{
  private long
    nom,
    denom;

  public static boolean doubleToString = false;


  public double get() { return nom/(double)denom; }


  Rational(long nom, long denom)
  {
    this.nom = nom;

    if(denom == 0)
      System.err.println("Denominator have 0");

    this.denom = denom;

    this.reduce();
  }

  Rational(int nom, int denom)
  { this((long)nom, (long)denom); }

  Rational(Rational r)
  { this(r.nom, r.denom); }

  Rational(long nom)
  { this(nom, 1); }

  Rational(int nom)
  { this(nom, 1); }


  private void reduce()
  {
    long denom = GCD(this.nom, this.denom);

    if(this.denom < 0)
    {
      this.nom = -this.nom/denom;
      this.denom = -this.denom/denom;
    } else
    {
      this.nom = this.nom/denom;
      this.denom = this.denom/denom;
    }
  }

  //  Greatest common divisor
  private long GCD(long a, long b)
  {
    long c;

    if(a < 0)
      a = -a;
    if(b < 0)
      b = -b;

    while(b != 0)
    {
      c = a%b;
      a = b;
      b = c;
    }

    return a;
  }

  public Rational plus(Rational b)
  {
    try
    {
      return new Rational(Math.addExact(Math.multiplyExact(this.nom, b.denom), Math.multiplyExact(this.denom, b.nom)), Math.multiplyExact(this.denom, b.denom));
    }
    catch(ArithmeticException e)
    {
      throw new RuntimeException(e.getMessage()+" -> "+this+" plus "+b);
    }
  }

  public Rational minus(Rational b)
  {
    try
    {
      return new Rational(Math.subtractExact(Math.multiplyExact(this.nom, b.denom), Math.multiplyExact(b.nom, this.denom)), Math.multiplyExact(this.denom, b.denom));
    }
    catch(ArithmeticException e)
    {
      throw new RuntimeException(e.getMessage()+" -> "+this+" minus "+b);
    }
  }

  public Rational minus(long b)
  { return minus(new Rational(b)); }

  public Rational minus(int b)
  { return minus(new Rational(b)); }


  public Rational multiply(Rational b)
  {
    try
    {
      return new Rational(Math.multiplyExact(this.nom, b.nom), Math.multiplyExact(this.denom, b.denom));
    }
    catch(ArithmeticException e)
    {
      throw new RuntimeException(e.getMessage()+" -> "+this+" multiply "+b);
    }
  }

  public Rational multiply(long b)
  { return multiply(new Rational(b)); }

  public Rational multiply(int b)
  { return multiply(new Rational(b)); }


  public Rational divide(Rational b)
  {
    try
    {
      return new Rational(Math.multiplyExact(this.nom, b.denom), Math.multiplyExact(this.denom, b.nom));
    }
    catch(ArithmeticException e)
    {
      throw new RuntimeException(e.getMessage()+" -> "+this+" divide "+b);
    }
  }

  public Rational divide(long b)
  { return divide(new Rational(b)); }

  public Rational divide(int b)
  { return divide(new Rational(b)); }


  public Rational power(Rational pow)
  {
    try
    {
      return new Rational((int)Math.round(Math.pow(this.nom, pow.get())), (int)Math.round(Math.pow(this.denom, pow.get())));
    }
    catch(ArithmeticException e)
    {
      throw new RuntimeException(e.getMessage()+" -> "+this+" power "+pow);
    }
  }

  public Rational power(int b)
  { return power(new Rational(b)); }


  public Rational negate()
  { return new Rational(-this.nom, this.denom); }

  public Rational absolute()
  { return new Rational(nom < 0 ? -nom : nom, denom < 0 ? -denom : denom);}


  @Override
  public boolean equals(Object o)
  { return (o instanceof Rational) && this.nom == ((Rational)o).nom && this.denom == ((Rational)o).denom; }

  @Override
  public int compareTo(Rational t)
  {
    if(this.nom == t.nom && this.denom == t.denom)
      return 0;
    if(this.nom*t.denom > t.nom*this.denom)
      return 1;
    else
      return -1;
  }

  @Override
  public String toString()
  {
    if(doubleToString)
      return ""+((double)nom/(double)denom);
    if(denom == 1)
      if(nom < 0)
        return "-"+(-nom);
      else
        return ""+nom;
    else
      if(nom < 0)
        return "-"+(-nom)+"/"+denom;
      else
        return nom+"/"+denom;
  }
}