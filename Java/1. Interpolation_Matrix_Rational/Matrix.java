import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collections;

class Matrix
{
  private ArrayList<ArrayList<Rational>> m;

  ArrayList<ArrayList<Rational>> get() { return m; }

  public Rational getRC(int row, int col)
  {
    if(row < 0 || row > m.size())
      System.err.println("Bad row index ("+row+") "+m.size());
    if(col < 0 || col > m.get(row).size())
      System.err.println("Bad column index ("+col+") "+m.get(row).size());

    return m.get(row).get(col);
  }

  public void setRC(int row, int col, Rational value)
  {
    if(row == m.size())
      m.add(new ArrayList<>());

    if(col == m.get(row).size())
      m.get(row).add(value);

    if(row < 0)
      System.err.println("Bad row "+row+". Size: "+m.size());
    if(col < 0)
      System.out.println("Bad column "+col+". Size: "+m.get(row).size());

    m.get(row).set(col, value);
  }

  Matrix()
  { m = new ArrayList<>(); }

  Matrix(Matrix old)
  { m = new ArrayList<>(old.get()); }

  Matrix(String plik)
  {
    this();
    this.addFromFile(plik);
  }

  Matrix(int sizeX, int sizeY, Rational value)
  {
    this();
    createMatrixValue(sizeX, sizeY, value);
  }

  Matrix(int sizeXY, Rational value)
  {
    this(sizeXY, sizeXY, value);
  }

  @Override
  public String toString()
  {
    String out = "";
    for(int i = 0; i < m.size(); ++i)
    {
      out += "|";
      for(int j = 0; j < m.get(i).size()-1; ++j)
        out += m.get(i).get(j)+"\t";
      out += m.get(i).get(m.get(0).size()-1)+"|\n";
    }
    return out;
  }


  public void createMatrixValue(int sizeX, int sizeY, Rational value)
  {
    for(int i = 0; i < sizeY; ++i)
      for(int j = 0; j < sizeX; ++j)
        setRC(i, j, value);
  }

  public void addFromFile(String fileName)
  {
    try
    {
      BufferedReader reader = new BufferedReader(new FileReader(fileName));
      String line;
      String[] parts, numerAndDenom;


      while((line = reader.readLine()) != null)
      {
        m.add(new ArrayList<>());

        parts = line.split(" ");


        for(String part : parts)
        {
          //! add float (XX.xxx) type
          // Decide it's Integer or Rational number
          numerAndDenom = part.split("/");

          if(numerAndDenom.length == 1)
            m.get(m.size()-1).add(new Rational(Integer.parseInt(numerAndDenom[0]), 1));
          else
            m.get(m.size()-1).add(new Rational(Integer.parseInt(numerAndDenom[0]), Integer.parseInt(numerAndDenom[1])));
        }
      }
      reader.close();
    } catch(Exception e)
    {
      System.err.println(e);
    }
  }

  // For tests https://planetcalc.com/3571/
  public ArrayList<Rational> gaussianElimination(Matrix a, Matrix b)
  {
    int size = a.sizeCols();
    Rational rightEquation, colFactor;


    for(int k = 0; k < size; ++k)// columns to zero
    {
      // Swap rows if on diagonal exists 0
      if(a.getRC(k, k).equals(new Rational(0)))
        for(int i = k; i < size; ++i)
          if(!a.getRC(k, i).equals(new Rational(0)))
            a.swapW(k, i);

      for(int tmpRow = k+1; tmpRow < size; ++tmpRow)// rows
      {
        colFactor = a.getRC(tmpRow, k).divide(a.getRC(k, k));

        for(int tmpCol = 0; tmpCol < size; ++tmpCol)// columns
        {
          rightEquation = a.getRC(k, tmpCol).multiply(colFactor);
          a.setRC(tmpRow, tmpCol, a.getRC(tmpRow, tmpCol).minus(rightEquation));
        }

        rightEquation = b.getRC(k, 0).multiply(colFactor);
        b.setRC(tmpRow, 0, b.getRC(tmpRow, 0).minus(rightEquation));
      }
    }

    Rational sum;
    ArrayList<Rational> out = new ArrayList<>();

    for(int i = size-1; i >= 0; --i)
    {
      sum = new Rational(0);

      for(int j = i+1; j < size; ++j)
        sum = sum.plus(a.getRC(i, j).multiply(out.get(size-j-1)));

      out.add(new Rational(b.getRC(i, 0).minus(sum).divide(a.getRC(i, i))));
    }

    Collections.reverse(out);

    return out;
  }

  public ArrayList<Rational> gaussianElimination(String matrixAName, String matrixBName)
  {
    return gaussianElimination(new Matrix(matrixAName), new Matrix(matrixBName));
  }

  public int sizeRows()
  {
    return m.size();
  }

  public int sizeCols()
  {
    int i = m.size(), maxCols = m.get(0).size();

    for(int j = 1; j < i; ++j)
      if(maxCols < m.get(j).size())
        maxCols = m.get(j).size();

    return maxCols;
  }

  public void swapW(int i, int j)
  {
    Collections.swap(m, i, j);
  }
}