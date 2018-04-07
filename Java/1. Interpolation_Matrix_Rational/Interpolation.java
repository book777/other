import java.util.ArrayList;

class Interpolation
{
  public Rational merging(Rational x, Rational[] xA, Rational[] yA, Rational[] xDer, Rational[] yDer)
  {
    if(xA.length != yA.length)
      System.err.println("Length x and y not same");

    Matrix a = new Matrix(xA.length+xDer.length, new Rational(0, 1));

    for(int i = 0; i < xA.length; ++i)// top left
      for(int j = 0; j < 4; ++j)
        a.setRC(i, j, xA[i].power(j));

    for(int i = 2; i < xA.length; ++i)// top right
      for(int j = 4; j < xA.length+i-xA.length+3/*i start*/; ++j)
        a.setRC(i, j, new Rational(xA[i].minus(xA[j+1-4])).power(3));

    for(int i = xA.length; i < xA.length+xDer.length; ++i)// bottom left
      for(int j = 1; j < 4; ++j)
        a.setRC(i, j, new Rational(j).multiply(new Rational(xDer[i-xA.length]).power(j-1)) );

    for(int i = xA.length+1; i < xA.length+xDer.length; ++i)// bottom right
      for(int j = 4; j < a.sizeCols(); ++j)
        a.setRC(i, j, new Rational( new Rational(xDer[i-xA.length]).minus(xA[j-xA.length+1]).power(2) ).multiply(3) );

    Matrix mResult = new Matrix();

    for(int i = 0; i < yA.length; ++i)
      mResult.setRC(i, 0, yA[i]);
    for(int i = 0; i < yDer.length; ++i)
      mResult.setRC(i+yA.length, 0, yDer[i]);

    Rational out = new Rational(0);
    ArrayList<Rational> b = new Matrix().gaussianElimination(a, mResult);

    for(int i = 0; i < 4; ++i)
      out = out.plus( new Rational(x).power(i).multiply(b.get(i) ) );

    for(int i = 0; i < xDer.length; ++i)
      if(x.compareTo(xA[i+1]) >= 0)
        out = out.plus(new Rational(x.minus(xA[i+1])).power(3).multiply(b.get(i+xA.length)));

    return out;
  }

  public Rational mergingCustom(Rational x, Rational[] xA, Rational[] yA, Rational[] xDer, Rational[] yDer)
  {
    if(xA.length != yA.length)
      System.err.println("Length x and y not same");

    Matrix a = new Matrix(xA.length+xDer.length, new Rational(0, 1));

    for(int i = 0; i < xA.length; ++i)// top left
      for(int j = 0; j < xA.length; ++j)
        a.setRC(i, j, xA[i].power(j));

    for(int i = 2; i < xA.length; ++i)// top right
      for(int j = 0; j < xDer.length; ++j)
        a.setRC(i, xA.length+j, new Rational(xA[i].minus(xA[j+1])).power(3));

    for(int i = xA.length; i < xA.length+xDer.length; ++i)// bottom left
      for(int j = 1; j < xA.length; ++j)
        a.setRC(i, j, new Rational(j).multiply(new Rational(xDer[i-xA.length]).power(j-1)) );

    for(int i = xA.length+1; i < xA.length+xDer.length; ++i)// bottom right
      for(int j = 0; j < xDer.length; ++j)
        a.setRC(i, j+i-1, new Rational(new Rational(xDer[i-xA.length]).minus(xA[j+1]).power(2)).multiply(3));

    Matrix mResult = new Matrix();

    for(int i = 0; i < yA.length; ++i)
      mResult.setRC(i, 0, yA[i]);
    for(int i = 0; i < yDer.length; ++i)
      mResult.setRC(i+yA.length, 0, yDer[i]);


    Rational out = new Rational(0);
    ArrayList<Rational> b = new Matrix().gaussianElimination(a, mResult);

    for(int i = 0; i < b.size()-2; ++i)
      out = out.plus( new Rational(x).power(i).multiply(b.get(i) ) );

    for(int i = 0; i < xDer.length; ++i)
      if(x.compareTo(xA[i+1]) >= 0)
        out = out.plus(new Rational( x.minus(xA[i+1]) ).power(3).multiply(b.get(i+xA.length)) );

    return out;
  }

  private int factorial(int i)
  {
    int sum = 1;

    if(i < 1)
      return sum;

    for(int j = 2; j <= i; ++j)
      sum *= j;

    return sum;
  }

  public Rational newtonsTwo(Rational x, Rational[] aX, Rational[] aY)
  {
    ArrayList<ArrayList<Rational>> a = new ArrayList<>();

    Rational h = new Rational(aX[1].minus(aX[0]));

    a.add(new ArrayList<>());

    for(int j = 1; j < aX.length; ++j)
      a.get(0).add( aY[j].minus(aY[j-1]) );

    for(int i = 1; i < aX.length-1; ++i)
    {
      a.add(new ArrayList<>());

      for(int j = 0; j < aX.length-i-1; ++j)
        a.get(i).add( a.get(i-1).get(j+1) .minus( a.get(i-1).get(j) ) );
    }

    Rational out = new Rational(aY[0]);
    Rational tmpFor;

    for(int i = 0; i < aX.length-1; ++i)
    {
      tmpFor = (a.get(i).get(0)).divide( new Rational(this.factorial(i+1)) .multiply( h.power(i+1) ) );

      for(int j = 0; j < i+1; ++j)
        tmpFor = tmpFor.multiply(x.minus(aX[j]));

      out = out.plus(tmpFor);
    }

    return out;
  }

  public Rational newtonsOne(Rational x, Rational[] aX, Rational[] aY)
  {
    ArrayList<ArrayList<Rational>> a = new ArrayList<>();

    a.add(new ArrayList<>());

    for(int j = 1; j < aX.length; ++j)
      a.get(0).add(
        aY[j].minus(aY[j-1]).divide(new Rational(aX[j].minus(aX[j-1])))
      );

    for(int i = 1; i < aX.length-1; ++i)
    {
      a.add(new ArrayList<>());

      for(int j = 0; j < aX.length-i-1; ++j)
        a.get(i).add(
          a.get(i-1).get(j+1) .minus( a.get(i-1).get(j) ) .divide( new Rational(aX[i+j+1].minus(aX[j])) )
        );
    }

    Rational out = new Rational(aY[0]);
    Rational tmpFor;

    for(int i = 0; i < aX.length-1; ++i)
    {
      tmpFor = a.get(i).get(0);

      for(int j = 0; j < i+1; ++j)
        tmpFor = tmpFor.multiply(x.minus(aX[j]));

      out = out.plus(tmpFor);
    }

    return out;
  }

  public Rational lagranges(Rational x, Rational[] aX, Rational[] aY)
  {
    Rational sum = new Rational(0);
    Rational multi;

    for(int i = 0; i < aX.length; ++i)
    {
      multi = new Rational(1);

      for(int j = 0; j < aX.length; ++j)
        if(i!=j)
          multi = multi.multiply( new Rational(x.minus(aX[j])) .divide( aX[i].minus(aX[j]) ) );

      sum = sum.plus(aY[i].multiply(multi));
    }

    return sum;
  }
}