public class Main
{
    public static void main(String[] args)
    {
      Rational.doubleToString = true;

      Rational[]// 1 My
        xA = new Rational[]{
          new Rational(-4),
          new Rational(-2),
          new Rational(0),
          new Rational(2),
          new Rational(4)
        },
        yA = new Rational[]{
          new Rational(-1207),
          new Rational(-75),
          new Rational(1),
          new Rational(-19),
          new Rational(-711)
        },
        xDer = new Rational[]{
          new Rational(-4),
          new Rational(4)
        },
        yDer = new Rational[]{
          new Rational(1182),
          new Rational(-802)
        };
      Rational x = new Rational(1);
      //Rational x = new Rational(3, 2);

    /* Rational[]// 2 Mateo
        xA = new Rational[]{
        new Rational(-4),
        new Rational(-2),
        new Rational(0),
        new Rational(2),
        new Rational(4)
      },
        yA = new Rational[]{
          new Rational(180),
          new Rational(12),
          new Rational(4),
          new Rational(-36),
          new Rational(-300)
        },
        xDer = new Rational[]{
          new Rational(-4),
          new Rational(4)
        },
        yDer = new Rational[]{
          new Rational(-156),
          new Rational(-220)
        };
      Rational x = new Rational(3);*/

      /*Rational[]// 3 Kristopher
        xA = new Rational[]{
        new Rational(-4),
        new Rational(-2),
        new Rational(0),
        new Rational(2),
        new Rational(4)
      },
        yA = new Rational[]{
          new Rational(-734),
          new Rational(-66),
          new Rational(2),
          new Rational(-2),
          new Rational(-318)
        },
        xDer = new Rational[]{
          new Rational(-4),
          new Rational(4)
        },
        yDer = new Rational[]{
          new Rational(668),
          new Rational(-372)
        };
      Rational x = new Rational(1);*/

      /*Rational[]// Ex. 4x
        xA = new Rational[]{
        new Rational(1),
        new Rational(3),
        new Rational(5),
        new Rational(7)
      },
        yA = new Rational[]{
          new Rational(1),
          new Rational(8),
          new Rational(9),
          new Rational(17)
        },
        xDer = new Rational[]{
          new Rational(1),
          new Rational(7)
        },
        yDer = new Rational[]{
          new Rational(1),
          new Rational(1)
        };
      //Rational x = new Rational(2);
      Rational x = new Rational(6);*/

      Interpolation i = new Interpolation();

      System.out.println("For x = "+x);
      System.out.println("Lagrange's method (1): " + i.lagranges(x, xA, yA));
      System.out.println("Newton's first method (2): " + i.newtonsOne(x, xA, yA));
      System.out.println("Newton's second method (3): " + i.newtonsTwo(x, xA, yA));
      System.out.println("Merging method (4): " + i.merging(x, xA, yA, xDer, yDer));
      System.out.println("Merging method custom: " + i.mergingCustom(x, xA, yA, xDer, yDer));
    }
}
